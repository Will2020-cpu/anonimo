import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { Scrollbars } from 'react-custom-scrollbars';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { detailsStatus } from "../actions/StatusActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:focus": {
      outline: "none",
    },
  },
  paper: {
    width: "70%",
    height: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ModalComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();

  const dispatch = useDispatch();
  const statusId = props.match.params.id;

  const statuDetails = useSelector((state) => state.statuDetails);
  const { loading, error, status } = statuDetails;

  const handleOpen = () => async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  useEffect(() => {
    dispatch(detailsStatus(statusId));
  }, [dispatch, statusId]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <Fade in={open}>
            <div className={classes.paper}>
              <div className="status">
                <div className="context">
                  <h1>{status.title}</h1>
                  <Scrollbars style={{ width: '100%', height: 400 }}>
                    <p>{status.description}</p>
                  </Scrollbars>
                </div>
                <div className="content">
                  <div className="reaction">
                    <ul>
                      <li>
                        <a>
                          <i>
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="text-black"
                              size="1x"
                            />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i>
                            <FontAwesomeIcon
                              icon={faComment}
                              className="text-black"
                              size="1x"
                            />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i>
                            <FontAwesomeIcon
                              icon={faShare}
                              className="text-black"
                              size="1x"
                            />
                          </i>
                        </a>
                      </li>
                      <li className="rightElli">
                        <a>
                          <i>
                            <FontAwesomeIcon
                              icon={faEllipsisH}
                              className="text-blac 40k"
                              size="1x"
                            />
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="comments">
                    {status.comments.map((item) => (
                      <div className="contComentario">
                        <div className="comentarios">
                          <div className="image">
                            <img src="../img/user1.png"></img>
                          </div>
                          <p>{item.description}</p>
                        </div>
                        <ul>
                          <li>
                            <a>encantarme</a>
                          </li>
                          <li className="tex">
                            <a>responder</a>
                          </li>
                        </ul>
                        <div className="responses">
                          <a>ver respuestas</a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="comentar">
                    <div className="image">
                      <img src="../img/user1.png"></img>
                    </div>
                    <input placeholder="Write comments..."></input>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        )}
      </Modal>
    </div>
  );
}
