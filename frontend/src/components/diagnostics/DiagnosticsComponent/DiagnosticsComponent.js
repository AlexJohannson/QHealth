import React, {useEffect, useState} from 'react';
import './DiagnosticsComponent.css';
import {diagnosticsService} from "../../../services/diagnosticsService";
import {DiagnosticsProfileComponent} from "../DiagnosticsProfileComponent/DiagnosticsProfileComponent";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {DiagnosticsFilterComponent} from "../DiagnosticsFilterComponent/DiagnosticsFilterComponent";
import {socketService} from "../../../services/socketService";
import {Link, useNavigate} from "react-router-dom";
import {FooterComponent} from "../../FooterComponent/FooterComponent";

const DiagnosticsComponent = () => {
    const [diagnostics, setDiagnostics] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchDiagnostics = async () => {
            setLoading(true);
            try {
                const data = await diagnosticsService.getAllDiagnosticsService({page, size});
                setDiagnostics(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load diagnostics');
            } finally {
                setLoading(false);
            }
        };
        fetchDiagnostics();
    }, [page, size, trigger]);

    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';

    const canCreate = isSuperUser || isStaff;

    useEffect(() => {
        socketInit().then()
    }, []);

    const socketInit = async () => {
        const service = await socketService();
        const client = service.diagnostics();

        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'subscribe_to_diagnostics_model_changes',
                request_id: new Date().getTime(),
            }));
        }
        client.onmessage = ({data}) => {
            setTrigger(prev => !prev)
        }
    }


    if (loading) return <p>Loading diagnostics...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className="diagnostics-component">
            <div className={'diagnostics-component-container-header'}>
                <img src={'/img/logo.png'} className={'logo-diagnostics-component-container'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'diagnostics-component-container-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <din className={'diagnostics-component-link'}>
                {canCreate && (
                    <Link className={'link-create-new-diagnostic'} to={'/create-new-diagnostic'}>Create New Modality</Link>
                )}
            </din>
            <div className={'diagnostics-component-filter'}>
                <DiagnosticsFilterComponent onFilter={(params) => {
                    diagnosticsService.getAllDiagnosticsService(params).then(res => setDiagnostics(res.data))
                }}/>
            </div>
            <div className={'diagnostics-component-maping'}>
                {diagnostics.length === 0 ? (
                    <p className={'diagnostics-component-information'}>No diagnostics found.</p>
                ) : (
                    diagnostics.map(diagnostic => (
                        <DiagnosticsProfileComponent key={diagnostic.id} diagnostic={diagnostic}/>
                    ))
                )}
            </div>
            <div className={'diagnostics-component-pagination'}>
                <PaginationComponent page={page} totalPages={totalPages} size={size} onPageChange={setPage}
                                     onSizeChange={(newSize) => {
                                         setSize(newSize);
                                         setPage(1);
                                     }}
                />
            </div>
            <FooterComponent/>
        </div>
    );
};

export {DiagnosticsComponent};