const Header = ({
    onSave
}) => {
    return (
        <header  className="header">
        <button onClick={
            ()=>{
                onSave();
            }
        } className="header-button">Save</button>
        </header>
    );
}

export default Header;