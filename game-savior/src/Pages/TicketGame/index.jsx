import axios from "axios"

export default function TicketGame(){

    axios.defaults.headers['X-Auth-Token'] = '11476ea25dc240e3896d3c993c233c5f';
        axios.get('https://api.football-data.org/v4/matches').then((response)=>{
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