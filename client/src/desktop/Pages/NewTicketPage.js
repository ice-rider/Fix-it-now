import React from 'react';
import styled from '@emotion/styled';
import { toast } from "react-toastify";
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Divider, Button, TextField, Typography, 
    Select, MenuItem, FormControl, Dialog, 
    DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { Data } from '../../App'

const Content = styled("div") ({
    position: 'relative',
    width: '60vw',
    left: '20vw',
    top: '90px',
    marginBottom: '125px',
    padding: '1.5em 2em',
    background: 'whitesmoke',
    boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.3)',
    borderRadius: '1em',
    boxSizing: 'border-box'
})
const FormGroup = styled("div") ({
    position: 'relative',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: '5px',
    margin: '20px 0'
})
const VisuallyHiddenInput = styled('input') ({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FormTitle = ({text}) => {return (<Typography variant='h5' sx={{position: 'relative', left: '5px'}}>{text}</Typography>); }
const FormInput = ({placeholder, multiline, rows, inputRef}) => {
    return (<TextField variant='outlined' placeholder={placeholder} multiline={multiline} rows={rows} inputRef={inputRef} />); 
}

export default function NewTicketPage () {
    const [section, setSection] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(Data);

    useEffect(() => {        
        if (user.auth !== true) {
            toast.error("Вы должны быть авторизованы для просмотра страницы");
            navigate("/login");
        }
    }, [navigate, user.auth])

    const descriptionRef = useRef();
    const locationRef = useRef();

    const createNewTicket = () => {
        const description = descriptionRef.current.value;
        const location = locationRef.current.value;

        const photoInputList = document.querySelectorAll("#photo-input");
        for (let photoInput of photoInputList) {
            if (photoInput.files[0])
                toast.info(`photo: ${photoInput.files[0].name}`)
        }
    }
    return (
        <>
            <Content>
                <center><Typography variant='h4'>Создание новой заявки</Typography></center><br />
                <Divider />
                <FormGroup>
                    <FormTitle text="Подробное описание" />
                    <FormInput placeholder={'Введите подробное описание неполадки, которую необходимо устранить'} multiline rows={4} inputRef={descriptionRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Местонахождение" />
                    <FormInput placeholder={'Номер кабинета или конкретное место'} inputRef={locationRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Тип поломки" />
                    <SectionSelect section={section} setSection={setSection}/>
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Прикрепите фотографии" />
                    <UploaderInput />
                </FormGroup>
                <FormGroup>
                    <Button 
                        variant='contained' 
                        sx={{margin: '1em 5% 0', width: '90%'}} 
                        onClick={createNewTicket}
                    >
                        Создать заявку
                    </Button>
                </FormGroup>
            </Content>
        </>
    )
}

function SectionSelect ({ section, setSection}) {
    const [sectionList, setSectionList] = useState(["[ плотник ]", "Электрика", "...(?)"])
    const [openSectionDialog, setOpenSectionDialog] = useState(false);

    const handleChange = (event) => {
        if (event.target.value !== -1)
            setSection(event.target.value);
    };

  return (
    <>
        <FormControl fullWidth>
            <Select
                id="demo-simple-select"
                value={section}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="">
                    Выберите тип поломки
                </MenuItem>
                { 
                    sectionList.map((section) => {
                        return <MenuItem value={section}> {section} </MenuItem>
                    })
                }
                <MenuItem onClick={()=>{setOpenSectionDialog(true);}} value={-1}>+ Добавить</MenuItem>
            </Select>
        </FormControl>
        <NewSectionDialog
            open={openSectionDialog} 
            onClose={(value) => {
                setSectionList([...sectionList, value]);
                handleChange({ target: { value: value } });
                setOpenSectionDialog(false);
            }}
            onCancel={() => {
                setOpenSectionDialog(false);
            }}
        />
    </>
  );
}

function UploaderInput() {
    const [fileName, setFileName] = useState('');
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
      }
    };
  
    return (
      <Button component="label" variant="outlined">
        { fileName ? `Прикреплено (${fileName})` : "Прикрепить файл" }
        <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" onChange={handleFileChange} id='photo-input'/>
      </Button>
    );
}

function NewSectionDialog ({ open, onClose, onCancel }) {
    const newSection = useRef();
    const handleClose = () => {
        onClose(newSection.current.value);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Введите новый тип поломки</DialogTitle>
            <DialogContent>
                <TextField inputRef={newSection} variant="outlined" />
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={onCancel}>Отменить</Button>
                <Button variant='text' onClick={handleClose}>Добавить</Button>
            </DialogActions>
        </Dialog>
    )
}