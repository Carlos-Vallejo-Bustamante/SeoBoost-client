import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import KeywordAxios from '../services/keywordAxios';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Spinner from '../components/Spinner';
import styles from '../styles/Home.module.css'


const SearchKeywords = () => {

    const [newData, setNewData] = useState({});
    const [copyNewData, setCopyNewData] = useState({});
    const [card, setCard] = useState(false);
    const [show, setShow] = useState(false);

    const createAudit = (eventHTML) => {
        setShow(true)
        eventHTML.preventDefault();
        KeywordAxios
            .keywords(copyNewData)
            .then((response) => {
                setNewData(response)
                setCard(true)

            });

    };

    const updateAudit = (eventHTML) => {
        const { name, value } = eventHTML.target;
        setCopyNewData({ ...copyNewData, [name]: value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.auditcontainer}>

                <Grid container justifyContent="center">
                    <Grid item xs={8}>

                        <h1>Keywords Sugeridas</h1>

                        <Box component="form" noValidate onSubmit={createAudit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        sx={{ mb: 3 }}
                                        required
                                        fullWidth
                                        id="search"
                                        label="Introduce tu keyword"
                                        name="search"
                                        onChange={updateAudit}
                                    />
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="country"
                                            label="Introduce tu pa??s(ej: es para Espa??a, us para Estados Unidos o uk para Reino Unido..)"
                                            name="country"
                                            onChange={updateAudit}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Buscar Keywords
                            </Button>

                            {card ?
                                newData.map((keyword) => (
                                    <>
                                        <List>
                                            <ListItem alignItems="center">
                                                <ListItemAvatar>
                                                    <CheckCircleIcon ></CheckCircleIcon>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    align="center"
                                                    primary={keyword}
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </List>

                                    </>
                                ))
                                : show &&
                                <Grid container spacing={2}>
                                    <Grid className={styles.spinnerCenter} item xs={12}>
                                        <Spinner />
                                    </Grid>
                                </Grid>

                            }
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default SearchKeywords;