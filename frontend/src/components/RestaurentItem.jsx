import { useDispatch } from "react-redux"
import { updateRestaurent, deleteRestaurent } from "../features/restaurents/restaurentSlice"
import { useState } from "react";


function RestaurentItem({restaurent}) {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: restaurent.name,
        address: restaurent.address,
        telephone: restaurent.telephone
    });

    const { name, address, telephone } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateRestaurent({ id: restaurent._id, restaurentData: formData }));
        setIsEditing(false);
    };
    
  return (
    <div className="goal">
            <div>{new Date(restaurent.createdAt).toLocaleString("en-US")}</div>
            {isEditing ? (
                <form onSubmit={onSubmit}>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                    <input type="text" name="address" value={address} onChange={onChange} required />
                    <input type="text" name="telephone" value={telephone} onChange={onChange} required />
                    <button type="submit" className="btn btn-block">Save</button>
                </form>
            ) : (
                <>
                    <h2>{restaurent.name}</h2>
                    <h3>{restaurent.address}</h3>
                    <h3>{restaurent.telephone}</h3>
                </>
            )}
            <button onClick={() => dispatch(deleteRestaurent(restaurent._id))} className="close">X</button>
            <button onClick={() => setIsEditing(!isEditing)} className="btn btn-block">{isEditing ? "Cancel" : "Update Restaurent"}</button>
        </div>
  )
}

export default RestaurentItem