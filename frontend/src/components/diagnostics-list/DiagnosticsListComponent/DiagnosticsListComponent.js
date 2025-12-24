import React, {useEffect, useState} from 'react';
import './DiagnosticsListComponent.css';
import {Link} from "react-router-dom";
import {diagnosticsService} from "../../../services/diagnosticsService";
import {socketService} from "../../../services/socketService";
import {DiagnosticsFilterComponent} from "../../diagnostics/DiagnosticsFilterComponent/DiagnosticsFilterComponent";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {DiagnosticsListProfile} from "../DiagnosticsListProfile/DiagnosticsListProfile";

const DiagnosticsListComponent = () => {
    const [diagnosticsList, setDiagnosticsList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);



    useEffect(() => {
        const fetchDiagnostics = async () => {
            setLoading(true);
            try {
                const data = await diagnosticsService.getAllDiagnosticsService({page, size});
                setDiagnosticsList(data.data);
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


   if (loading) return (
        <div className="diagnostics-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="diagnostic-skeleton-item">
                    <div className="diagnostic-skeleton-avatar"></div>
                    <div className="diagnostic-skeleton-info">
                        <div className="diagnostic-skeleton-line short"></div>
                        <div className="diagnostic-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className="diagnostics-list-component">
            {canCreate && (
            <din className={'diagnostics-list-component-link'}>
                <Link className={'link-create-new-diagnostic-list-component'} to={'/create-new-diagnostic'}>Create New Modality</Link>
            </din>
                )}
            <div className={'diagnostics-list-component-filter'}>
                <DiagnosticsFilterComponent onFilter={(params) => {
                    diagnosticsService.getAllDiagnosticsService(params).then(res => setDiagnosticsList(res.data))
                }}/>
            </div>
            <div className={'diagnostics-list-component-maping'}>
                {diagnosticsList.length === 0 ? (
                    <p className={'diagnostics-list-component-information'}>No diagnostics found.</p>
                ) : (
                    diagnosticsList.map(diagnostic => (
                        <DiagnosticsListProfile key={diagnostic.id} diagnostic={diagnostic}/>
                    ))
                )}
            </div>
            <div className={'diagnostics-list-component-pagination'}>
                <PaginationComponent page={page} totalPages={totalPages} size={size} onPageChange={setPage}
                                     onSizeChange={(newSize) => {
                                         setSize(newSize);
                                         setPage(1);
                                     }}
                />
            </div>
        </div>
    );
};

export {DiagnosticsListComponent};