import React, {useEffect, useState} from 'react';
import './PatientJournalComponent.css';
import {patientJournal} from "../../../services/patientJournal";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {PatientJournalProfile} from "../PatientJournalProfile/PatientJournalProfile";
import {socketService} from "../../../services/socketService";
import {PatientJournalFilter} from "../PatientJournalFilter/PatientJournalFilter";
import {useNavigate} from "react-router-dom";

const PatientJournalComponent = () => {
    const [journals, setJournals] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchJournals = async () => {
            setLoading(true);
            try {
                const data = await patientJournal.getAllPatientJournal({page, size});
                setJournals(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load journals');
            } finally {
                setLoading(false);
            }
        };
        fetchJournals();
    }, [page, size, trigger]);


    useEffect(() => {
        socketInit().then()
    }, []);


    const socketInit = async () => {
        const service = await socketService();
        const client = service.patientCard();

        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'subscribe_to_patient_card_model_changes',
                request_id: new Date().getTime(),
            }))
        }
        client.onmessage = ({data}) => {
            setTrigger(prev => !prev)
        }
    }


    if (loading) return <div className={'loading-patient-journal'}><h1 className={'loading-patient-journal-text'}>Loading...</h1></div>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'patient-journal-component'}>
            <div className={'patient-journal-component-header'}>
                <img src={'/img/logo.png'} className={'logo-patient-journal-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'patient-journal-component-header-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'patient-journal-component-filter'}>
                <PatientJournalFilter onFilter={(params) => {
                    patientJournal.getAllPatientJournal(params).then(res => setJournals(res.data));
                }}/>
            </div>
            <div className={'patient-journal-component-maping'}>
                {journals.length === 0 ? (
                    <p className={'patient-journal-component-maping-information'}>No patients journals found.</p>
                ) : (
                    journals.map((journal) => (
                        <PatientJournalProfile key={journal.id} journal={journal}/>
                    ))
                )}
            </div>
            <div className={'patient-journal-component-pagination'}>
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

export {PatientJournalComponent};