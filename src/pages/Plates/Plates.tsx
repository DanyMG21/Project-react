import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { PlatesActions } from "../../store/actions/plates";
import { Button, Grid } from "@mui/material";
import UpdatePlateModal from "../../components/Plates/UpdatePlateModal/UpdatePlateModal";
import { Plate } from "../../types/Plate";
import {
  getPlatesListInProgressSelector,
  plateListSelector,
} from "../../store/selectors/plates";
import DeletePlateModal from "../../components/Plates/DeletePlateModal/DeletePlateModal";
import CustomList from "../../components/CustomList/CustomList";
import PlateListItem from "../../components/Plates/PlateListItem/PlateListItem";
import EmptyState from "../../components/EmptyState/EmptyState";
import LoadingState from "../../components/LoadingState/LoadingState";

const Plates = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(PlatesActions.getPlates());
  }, [dispatch]);

  const plateList = useSelector(plateListSelector);
  const fetchingPlate = useSelector(getPlatesListInProgressSelector);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updatePlate, setUpdatePlate] = useState<Plate>();

  const handleUpdate = (item: Plate) => {
    setUpdatePlate(item);
    setShowCreateDialog(true);
  };

  const handleDelete = (item: Plate) => {
    setUpdatePlate(item);
    setShowDeleteDialog(true);
  };

  const handleUpdateOnDismiss = () => {
    setUpdatePlate(undefined);
    setShowCreateDialog(false);
  };

  const handleDeleteOnDismiss = () => {
    setUpdatePlate(undefined);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <UpdatePlateModal
        open={showCreateDialog}
        onClose={handleUpdateOnDismiss}
        plate={updatePlate}
      />
      <DeletePlateModal
        open={showDeleteDialog}
        onClose={handleDeleteOnDismiss}
        plate={updatePlate}
      />

      <Layout>
        {fetchingPlate && (
          <LoadingState message="Loading Plates..."/>
        )}
        {!fetchingPlate && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Plates</h1>
              <Button
                variant="contained"
                onClick={() => setShowCreateDialog(true)}
              >
                add new Plate
              </Button>
            </Grid>

            {(plateList && plateList.length > 0) ? (
              <Grid item xs={9}>
                <CustomList<Plate>
                  collection={plateList}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  renderAs={PlateListItem}
                />
              </Grid>
            ): 
              (<EmptyState message="No plates available"/>)
            }
          </Grid>
        )}
      </Layout>
    </>
  );
};

export default Plates;