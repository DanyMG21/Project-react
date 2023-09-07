import { Delete, Edit, Fastfood } from "@mui/icons-material"
import { Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material"
import { ListItemcomponent } from "../../CustomList/CustomList"
import { Client } from "../../../types/Client"


const ClientListItem:React.FC<ListItemcomponent<Client>> = ({item,onUpdate,onDelete})=>{
    return (
        <ListItem key={item.id}>
                    <Avatar>
                      <Fastfood/>
                    </Avatar>
  
                    <ListItemText
                      primary={`${item.firstName} ${item.lastName}`}
                      secondary={`Birthdate: ${item.birthdate}`}
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

export default ClientListItem