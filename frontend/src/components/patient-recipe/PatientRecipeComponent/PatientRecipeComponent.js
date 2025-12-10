import React, {useEffect, useState} from 'react';
import './PatientRecipeComponent.css';
import {patientRecipeService} from "../../../services/patientRecipeService";
import {PatientRecipeProfile} from "../PatientRecipeProfile/PatientRecipeProfile";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {socketService} from "../../../services/socketService";
import {PatientRecipeFilter} from "../PatientRecipeFilter/PatientRecipeFilter";
import {useNavigate} from "react-router-dom";

const PatientRecipeComponent = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const data = await patientRecipeService.getAllPatientRecipe({page, size});
                setRecipes(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load recipes');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [page, size, trigger]);

    useEffect(() => {
        socketInit().then()
    }, []);


    const socketInit = async () => {
        const service = await socketService();
        const client = service.patientRecipe();

        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'subscribe_to_patient_recipe_model_changes',
                request_id: new Date().getTime(),
            }))
        }
        client.onmessage = ({data}) => {
            setTrigger(prev => !prev)
        }
    }

    if (loading) return <div className={'loading-patient-recipe'}><h1 className={'loading-patient-recipe-text'}>Loading...</h1></div>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className={'patient-recipe-container'}>
            <div className={'patient-recipe-component-header'}>
                <img src={'/img/logo.png'} className={'logo-patient-recipe-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'patient-recipe-component-header-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'patient-recipe-component-filter'}>
                <PatientRecipeFilter onFilter={(params) => {
                    patientRecipeService.getAllPatientRecipe(params).then(res => setRecipes(res.data))
                }}/>
            </div>
            <div className={'patient-recipe-component-maping'}>
                {recipes.length === 0 ? (
                    <p className={'patient-recipe-component-maping-information'}>No patients journals found.</p>
                ) : (
                    recipes.map((recipe) => (
                        <PatientRecipeProfile key={recipe.id} recipe={recipe}/>
                    ))
                )}
            </div>
            <div className={'patient-recipe-component-pagination'}>
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

export {PatientRecipeComponent};