import axios from "axios"

export default function TicketGame(){

    axios.get('https://balldontlie.io/api/v1/games?seasons[]=2023').then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })

    return(
        <div>

        </div>
    )
}