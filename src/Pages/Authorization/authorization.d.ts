type ModalProp = {
  openModal: () => void;
  closeModal: () => void;
  show: () => boolean;
};

type AutorizeProp = {
  modal: ModalProp;
  mainClasses: string;
  activeClass: string;
};

type LogInProp = {
  modal: ModalProp;
  callRegistration: () => void;
  setFormToLogOut: () => void;
  authorize: () => void;
};

type LogOutProp = {
  modal: ModalProp;
  setFormToLogIn: () => void;
  unAuthorize: () => void;
};
