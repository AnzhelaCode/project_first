import * as React from "react";
import { useSearchParams } from "react-router-dom";
import {useState,useEffect} from "react";
import {fetchPopularRepos} from "../../api";
import SelectLanguages from "./SelectLanguages";
import Repos from "./Repos";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";


function Popular(){
    const [selectedLanguage, setSelectedLanguages]= useState('All');
    let [searchParams, setSearchParams] = useSearchParams();

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    useEffect(()=>{
        setLoading(true);

        fetchPopularRepos(selectedLanguage)
            .then(data => {
                setRepos(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
                setErrorMessage(true);
            })
    },[]);


    const selectLanguage = (language)=>{
        setSelectedLanguages(language);
        setLoading(true);

        setSearchParams({"language":language});

        fetchPopularRepos(language)
            .then(data => {
                setRepos(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setErrorMessage(true);
                console.log(error);
            });

    }

    const languageItem = searchParams.get('language');

    useEffect(()=>{
        if(languageItem ){
            selectLanguage(languageItem);
        }

    },[languageItem]);

    return(
        <>
            <SelectLanguages
                selectedLanguage={selectedLanguage}
                selectLanguage={selectLanguage}

            />

            {loading ? <Loading /> : null}
            {errorMessage ? <ErrorMessage /> : null}
            <Repos
            repos={repos}/>
        </>

    )
}
export default  Popular;