import PlayerPreviw from "./PlayerPreviw";

const Profile=({info})=>{
    return(
        <PlayerPreviw
            avatar={info.avatar_url}
            username={info.login}
        >
            <ul className="space-list-items">
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                {<li>Followers: {info.followers}</li>}
                {<li>Following: {info.following}</li>}
                {<li>Pablic repos: {info.public_repos}</li>}
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}

            </ul>
        </PlayerPreviw>
    )
}
export default Profile;