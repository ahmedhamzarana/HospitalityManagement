import { useState, useEffect } from "react";
import { AppLayout } from "../components/AppLayout.jsx";
import axios from "axios";

export default function Staff() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.users || response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setAlertMessage("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data;

      setSelectedUserId(id);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        status: user.status || "",
      });
      setOpen(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      setAlertMessage("Failed to load user details.");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/update/${selectedUserId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlertMessage("User updated successfully.");

      setOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Update Error:", error);
      setAlertMessage(
        error.response?.data?.error || "Failed to update user."
      );
    }
  };

  return (
    <AppLayout title="Staff & Roles" subtitle="Admin: manage team">
      {alertMessage && (
        <div className="mb-4 rounded-md bg-muted p-3 text-sm">
          {alertMessage}
        </div>
      )}

      {/* TABLE */}
      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase text-muted-foreground">
            <tr className="text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="px-4 py-3 font-medium">
                    {u.name}
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    {u.email}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {u.role}
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {u.status || "active"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(u._id)}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="card-elevated w-full max-w-md p-6 space-y-4 bg-background rounded-lg">
            <h2 className="font-display text-xl">
              Edit Staff Member
            </h2>

            <label className="block text-sm">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              Role
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="receptionist">Receptionist</option>
                <option value="housekeeping">Housekeeping</option>
                <option value="guest">Guest</option>
              </select>
            </label>

            <label className="block text-sm">
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm hover:bg-muted rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}