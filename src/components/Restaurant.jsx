import {useState, useEffect} from "react"
import api from "../services/api"

const Restaurant=()=>{
    const[restaurants, setRestaurants]=useState([]);
    const[error, setError]=useState("");
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchingApi=async ()=>{
            try{
                  const res=await api.get("/restaurants");
                  setRestaurants(res.data)
                  setLoading(false)
            }catch(err){
                  setError(error)
                  setLoading(false)
            }
          
        }
        fetchingApi()

    }, [])

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

    return(
        <div>
            <h3>Restaurant</h3>
            <div>
                {restaurants.map((r)=>{
              <div>
                <img src={r.image_path} alt={r.name}/>
                <div>
                    <h3>{r.name}</h3>
                    <p>Cusine:{r.cuisine_type}</p>
                    <p>Rating:{r.rating}</p>
                    <p>ETA:{r.eta}</p>
                    <p>Address:{r.address}</p>

                    </div>
                </div>

                
            })}

        </div>
            </div>
            
    )
}

export default Restaurant;