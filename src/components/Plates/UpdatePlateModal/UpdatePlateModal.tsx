import { useEffect, useState } from "react";
import { Plate } from "../../../types/Plate";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlateInProgressSelector,
  updatePlateInProgressSelector,
} from "../../../store/selectors/plates";
import Modal from "../../Modal/Modal";
import { TextField } from "@mui/material";
import { Save } from "@mui/icons-material";
import { PlatesActions } from "../../../store/actions/plates";

interface UpdatePlateModalProps {
  plate?: Plate;
  open: boolean;
  onClose: () => void;
}

const UpdatePlateModal:React.FC<UpdatePlateModalProps> = ({ plate, open, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dirty,setDirty]=useState(false)
  const updateInProgress = useSelector(updatePlateInProgressSelector);
  const createInProgress = useSelector(createPlateInProgressSelector);
  const creationMode = !plate;
  const confirmLabel = creationMode ? "Create" : "Update";
  const title = `${confirmLabel} Plate`;
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!plate){
      setName('')
      setPrice('')
      return
    }
    setName(plate.name)
    setPrice(plate.price.toString())
  },[plate])

  useEffect(()=>{
    if(!dirty)return 
    if(!(updateInProgress|| createInProgress)){
      onClose()
      setDirty(false)
      setName('')
      setPrice('')
    }
  },[createInProgress,dirty,onClose,updateInProgress])

  const handleConfirm = (
    payload: Partial<Plate>,
    currentPlate: Plate | undefined
  ) => {
    const payloadCandidate: Plate = creationMode
      ? ({ ...payload, status: true } as Plate)
      : ({ ...currentPlate, ...payload } as Plate);

    const disaptchAction = creationMode
      ? PlatesActions.createPlate
      : PlatesActions.updatePlate;

    //@ts-ignore
    dispatch(disaptchAction(payloadCandidate));
    setDirty(true)

  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      onConfirm={() => handleConfirm({ name, price: Number(price) }, plate)}
      title={title}
      confirmLabel={confirmLabel}
      updateInProgress={updateInProgress || createInProgress}
      confirmIcon={<Save></Save>}
      cancelLabel = "Cancel"
    >
      <>
        <TextField
          type="text"
          fullWidth
          margin="dense"
          label="Plate name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="text"
          fullWidth
          margin="dense"
          label="Plate price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </>
    </Modal>
  );
};
export default UpdatePlateModal;
