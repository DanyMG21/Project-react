import { useEffect, useState } from "react";
import { Client } from "../../../types/Client";
import { useDispatch, useSelector } from "react-redux";
import {
  createClientInProgressSelector,
  updateClientInProgressSelector,
} from "../../../store/selectors/clients";
import Modal from "../../Modal/Modal";
import { TextField } from "@mui/material";
import { Save } from "@mui/icons-material";
import { ClientsActions } from "../../../store/actions/clients";

interface UpdateClientModalProps {
  client?: Client;
  open: boolean;
  onClose: () => void;
}

const UpdateClientModal:React.FC<UpdateClientModalProps> = ({ client, open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [dirty,setDirty]=useState(false)
  const updateInProgress = useSelector(updateClientInProgressSelector);
  const createInProgress = useSelector(createClientInProgressSelector);
  const creationMode = !client;
  const confirmLabel = creationMode ? "Create" : "Update";
  const title = `${confirmLabel} Client`;
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!client){
      setFirstName('')
      setLastName('')
      setBirthdate('')
      return
    }
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setBirthdate(client.birthdate)
  },[client])

  useEffect(()=>{
    if(!dirty)return 
    if(!(updateInProgress|| createInProgress)){
      onClose()
      setDirty(false)
      setFirstName('')
      setLastName('')
      setBirthdate('')
    }
  },[createInProgress,dirty,onClose,updateInProgress])

  const handleConfirm = (
    payload: Partial<Client>,
    currentClient: Client | undefined
  ) => {
    const payloadCandidate: Client = creationMode
      ? ({ ...payload, status: true } as Client)
      : ({ ...currentClient, ...payload } as Client);

    const disaptchAction = creationMode
      ? ClientsActions.createClient
      : ClientsActions.updateClient;

    //@ts-ignore
    dispatch(disaptchAction(payloadCandidate));
    setDirty(true)

  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      onConfirm={() => handleConfirm({firstName,lastName, birthdate }, client)}
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
          label="Client FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          type="text"
          fullWidth
          margin="dense"
          label="Client LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          type="text"
          fullWidth
          margin="dense"
          label="Client birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </>
    </Modal>
  );
};
export default UpdateClientModal;
