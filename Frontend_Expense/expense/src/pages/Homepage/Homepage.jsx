import { Container } from "react-bootstrap"
import NavBar from "../../components/navbar/navbarhomepage/navbar_homepage"
import styles from './homepage.module.css'


function HomePage(){
    return(
        <>
        <header>
            <Container className={styles.container}>
                <NavBar />
                <div classname = {styles.navbar}>
                </div>
            </Container>
        </header>
        </>    
    )
}

export default HomePage