import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./card.css"
import { Link } from "react-router-dom"

const Cards = ({movie, username}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

    var moviestring= movie[4];

    return <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={`/${username}/movie/${movie[0]}/${movie[1]}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={movie[11]} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie[1]:""}</div>
                    <div className="card__runtime">
                        {movie?movie[2]:""}
                        <span className="card__rating">{movie?movie[5]:""}<i className="fas fa-star" /></span>
                    </div>
                    
                    <div className="card__description">{movie ? movie[4]+"..." : ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}

export default Cards