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
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 5;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(null);
    const filtersFromUrl = {
        patient_name: searchParams.get("patient_name") || "",
        patient_surname: searchParams.get("patient_surname") || "",
         recipe: searchParams.get("recipe") || "",
    };

    const [filters, setFilters] = useState(filtersFromUrl);

    const updateSearchParams = (params) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);

            Object.entries(params).forEach(([key, value]) => {
                if (value === '' || value === null || value === undefined) {
                    next.delete(key);
                } else {
                    next.set(key, value);
                }
            });

            return next;
        });
    };

    useEffect(() => {
        setFilters(filtersFromUrl);
    }, [searchParams]);



    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const data = await patientRecipeService.getAllPatientRecipe({
                    page,
                    size,
                    ...filtersFromUrl,
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
    }, [trigger, searchParams]);

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

    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);

        updateSearchParams({
            ...newFilters,
            page: 1,
            size,
        });
    };

    const handlePageChange = (newPage) => {
        updateSearchParams({
            page: newPage,
            size,
            ...filtersFromUrl,
        });
    };

    const handleSizeChange = (newSize) => {
        updateSearchParams({
            page: 1,
            size: newSize,
            ...filtersFromUrl,
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
                <PatientRecipeFilter
                    filters={filters}
                    onApply={handleFilterApply}
                />
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