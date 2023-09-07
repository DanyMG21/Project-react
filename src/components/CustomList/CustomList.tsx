import { List } from "@mui/material";

export interface ListItemInterface {
  id: number | string;
}

export interface ListItemcomponent<T extends ListItemInterface> {
  item: T;
  onUpdate: (item: T) => void;
  onDelete: (item: T) => void;
}

export interface ListProps<T extends ListItemInterface> {
  collection: T[];
  onUpdate: (item: T) => void;
  onDelete: (item: T) => void;
  renderAs:React.FC<ListItemcomponent<T>>
}
const CustomList = <T extends ListItemInterface>(props:ListProps<T>) => {
  const { collection, onUpdate, onDelete,renderAs } = props
  return (
    <List>
      {collection.map((item) => {
       /* return (
          <PlateListItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          
        );*/
        return renderAs({item,onDelete,onUpdate})
      })}
    </List>
  );
};

export default CustomList;
