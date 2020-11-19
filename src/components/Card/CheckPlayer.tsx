import React, {useState} from 'react'
import Checkbox from '@material-ui/core/Checkbox';


interface Props{
    player: any,
    handlePlayers: any,
}
const CheckPlayer:React.FC<Props> = ({player, handlePlayers}) => {
    const [checked, setChecked] = useState(false)

    return (
        <div>
            <Checkbox 
                color='default'
                checked={checked} 
                onClick={() => handlePlayers(player, setChecked)} 
            />
            {player.name}
        </div>
    )
}

export default CheckPlayer
