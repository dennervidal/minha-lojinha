import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router";
import APIService from "../../../utils/APIService";

export const AppMenu = ({ anchorEl, handleMenuClose }) => {
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();
  const logado = !!localStorage.getItem("token"); // pegar o token do localstore

  const logout = () => {
    APIService.logout()
      .then(() => {
        localStorage.clear();
        handleMenuClose();
        history.push("/");
      })
      .catch(() => {
        localStorage.clear();
        handleMenuClose();
        history.push("/");
      });
  };

  const logar = () => {
    history.push("/login");
  };

  const cadastroUsuario = () => {
    history.push("/cadastro");
    handleMenuClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!logado && (
        <div>
          <MenuItem onClick={cadastroUsuario}>Criar conta</MenuItem>
          <MenuItem onClick={logar}>Login</MenuItem>
        </div>
      )}
      {logado && (
        <div>
          <MenuItem onClick={() => history.push("/conta")}>
            Minha conta
          </MenuItem>
          <MenuItem onClick={logout}>Sair</MenuItem>
        </div>
      )}
    </Menu>
  );
};
