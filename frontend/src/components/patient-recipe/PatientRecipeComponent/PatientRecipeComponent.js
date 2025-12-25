import React, {useEffect, useState} from 'react';
import './PatientRecipeComponent.css';
import {patientRecipeService} from "../../../services/patientRecipeService";
import {PatientRecipeProfile} from "../PatientRecipeProfile/PatientRecipeProfile";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {socketService} from "../../../services/socketService";
import {PatientRecipeFilter} from "../PatientRecipeFilter/PatientRecipeFilter";
import { useSearchParams } from "react-router-dom";

const PatientRecipeComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const [filters, setFilters] = useState({
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
         recipe: searchParams.get("recipe") || "",
    });

    const updateQueryParams = (params) => {
        const cleaned = {};

        Object.entries(params).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                cleaned[key] = value;
            }
        });

        setSearchParams(cleaned);
    };



    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const data = await patientRecipeService.getAllPatientRecipe({
                    page,
                    size,
                    ...filters,
                });
                setRecipes(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load recipes');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [page, size, trigger, filters]);

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
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        setPage(1);

        updateQueryParams({
            page: 1,
            size,
            ...newFilters,
        });
    };


    const handlePageChange = (newPage) => {
        setPage(newPage);

        updateQueryParams({
            page: newPage,
            size,
            ...filters,
        });
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setPage(1);

        updateQueryParams({
            page: 1,
            size: newSize,
            ...filters,
        });
    };

    if (loading) return (
        <div className="patient-recipe-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="patient-recipe-skeleton-item">
                    <div className="patient-recipe-skeleton-avatar"></div>
                    <div className="patient-recipe-skeleton-info">
                        <div className="patient-recipe-skeleton-line short"></div>
                        <div className="patient-recipe-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className={'patient-recipe-container'}>
            <div className={'patient-recipe-component-filter'}>
                <PatientRecipeFilter onFilter={handleFilter}/>
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
                <PaginationComponent
                    page={page}
                    totalPages={totalPages}
                    size={size}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                />
            </div>
        </div>
    );
};

export {PatientRecipeComponent};