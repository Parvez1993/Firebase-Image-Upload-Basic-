import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import { db } from "../firebase";
import styled from "styled-components";
function Home() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const q = query(collection(db, "images"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setImages(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      console.log("aaa", images);
    });
  }, []);

  //edit

  const handleEdit = async (id) => {
    setOpen(false);
    let newAddress = doc(db, "images", id);
    await updateDoc(newAddress, { name: name });
    setName("");
  };

  return (
    <>
      <Container>
        <div className="images" style={{ marginTop: "100px" }}>
          <Grid>
            {images
              ? images.map((item, i) => {
                  return (
                    <>
                      <Grid.Column mobile={16} tablet={8} computer={4} key={i}>
                        <Card style={{ margin: "auto" }}>
                          <img
                            src={item.url}
                            alt={item.name}
                            wrapped
                            ui={false}
                            style={{ height: "300px", objectFit: "cover" }}
                          />
                          <Card.Content>
                            <Card.Header>
                              <EditWrapper>
                                <div className="name">
                                  <h5> Name: {item.name.slice(0, 10)}</h5>

                                  <Modal
                                    closeIcon
                                    open={open}
                                    trigger={<Button>Edit</Button>}
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                  >
                                    <Header
                                      icon="archive"
                                      content="Rename Image"
                                    />
                                    <Modal.Content>
                                      <Form>
                                        <Label>
                                          Choose a classy name for your Image
                                        </Label>
                                        <input
                                          type="text"
                                          placeholder="type here"
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                        />
                                      </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                      <Button
                                        color="red"
                                        onClick={() => setOpen(false)}
                                      >
                                        <Icon name="remove" /> No
                                      </Button>
                                      <Button
                                        color="green"
                                        onClick={() => handleEdit(item.id)}
                                      >
                                        <Icon name="checkmark" /> Yes
                                      </Button>
                                    </Modal.Actions>
                                  </Modal>
                                </div>
                              </EditWrapper>
                            </Card.Header>
                            <Card.Meta>
                              <span className="date"></span>
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </>
                  );
                })
              : "nothing to display"}
          </Grid>
        </div>
      </Container>
    </>
  );
}

const EditWrapper = styled.div`
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Home;
