import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Fonction qui s'active lors du clic sur "Découvrez nos recommandations"
  const goToRecommendations = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowModal(true); // Ouvre la modale si l'utilisateur n'est pas connecté
    } else {
      navigate("/recommandations"); // Si l'utilisateur est déjà connecté, on l'envoie vers les recommandations
    }
  };

  // Fonction d'inscription
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (email && password && username) {
      console.log("Inscription : Email:", email, "Username:", username, "Mot de passe:", password);
      localStorage.setItem("token", "fake_token"); // Simule un token après inscription
      setIsRegistering(false); // Passe au formulaire de connexion après l'inscription
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Fonction de connexion
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log("Connexion : Email:", email, "Mot de passe:", password);
      localStorage.setItem("token", "fake_token"); // Simule un token après connexion
      setShowModal(false); // Ferme la modale
      navigate("/recommandations"); // Redirige vers les recommandations
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Retire le token du localStorage
    navigate("/"); // Redirige l'utilisateur vers la page d'accueil
  };

  // Vérifie si l'utilisateur est connecté
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div style={styles.container}>
      <Container className="text-center text-white d-flex align-items-center justify-content-center" style={styles.overlay}>
        <Row>
          <Col md={12}>
            <h1 className="display-4">Bienvenue à Marrakech !</h1>
            <p className="lead">Découvrez les meilleures activités, hôtels et restaurants adaptés à votre budget.</p>

            <Button variant="danger" onClick={goToRecommendations} size="lg">
              Découvrez nos recommandations
            </Button>

            {/* Afficher le bouton de déconnexion si l'utilisateur est connecté */}
          
          </Col>
        </Row>
      </Container>

      {/* Modale pour inscription / connexion */}
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{isRegistering ? "Inscription" : "Connexion"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
            {isRegistering && (
              <Form.Group className="mb-3">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {isRegistering ? "S'inscrire" : "Se connecter"}
            </Button>
          </Form>

          {/* Lien pour passer de l'inscription à la connexion */}
          <div className="mt-3 text-center">
            {isRegistering ? (
              <p>
                Vous avez déjà un compte ?{" "}
                <Button variant="link" onClick={() => setIsRegistering(false)}>
                  Se connecter
                </Button>
              </p>
            ) : (
              <p>
                Vous n'êtes pas encore inscrit ?{" "}
                <Button variant="link" onClick={() => setIsRegistering(true)}>
                  S'inscrire
                </Button>
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: "url('/images/HAJAR.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "50px",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Accueil;
