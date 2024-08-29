function AdminLayout({ children }) {
    return (
        <div>
            <h1>Heder Admin</h1>
            <div className="container">{children}</div>
            <h1>Footer Admin</h1>
        </div>
    );
}

export default AdminLayout;
