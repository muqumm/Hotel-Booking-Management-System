import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <h2>Admin Dashboard</h2>
            <div className="admin-options">
                <Link to="/admin/view-bookings" className="admin-option">
                    <h3>View Bookings</h3>
                    <p>See all current and past bookings</p>
                </Link>
                <Link to="/admin/update-rooms" className="admin-option">
                    <h3>Update Rooms</h3>
                    <p>Add, edit or remove rooms</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;