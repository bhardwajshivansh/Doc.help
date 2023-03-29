import React from "react";

const Layout =() =>{
    return{
     <>
      <div className="main">
      <div className="layout">
      <div className="sidebar">
      <div className="logo"><h6>DOC APP
        </h6><hr/></div>
      < div className="menu">{SidebarMenu.map(menu=> {
        const isActive= location.pathname === menu.path
       return(
          <>
          <div className="menu-item ${isActive && 'active'} ">
            <i className={menu.icon}></i>
          <Link to={menu.path}>{menu.name}</Link>
          </div>
          </>
        )
      })}
      </div>
      </div>
      <div className="content">
      <div className="header">Header</div>
      <div className="body">{children}</div>
      </div>
      </div>
      </div>  
      </>
    };
};

export default Layout;