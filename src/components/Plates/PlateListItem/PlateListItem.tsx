import { Delete, Edit, Fastfood } from "@mui/icons-material"
import { Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material"
import { ListItemcomponent } from "../../CustomList/CustomList"
import { Plate } from "../../../types/Plate"


const PlateListItem:React.FC<ListItemcomponent<Plate>> = ({item,onUpdate,onDelete})=>{
    return (
        <ListItem key={item.id}>
                    <Avatar>
                      <Fastfood/>
                    </Avatar>
  
                    <ListItemText
                      primary={item.name}
                      secondary={item.price}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={ ()=>onUpdate(item) }>
                        <Edit/>
                      </IconButton>
                      <IconButton onClick={ ()=>onDelete(item) }>
                        <Delete/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
    )
}

export default PlateListItem