import React from 'react';
import styled from '@emotion/styled';
import { toast } from "react-toastify";
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { Data } from '../../App'

const Content = styled("div") ({
    position: 'relative',
    width: '60vw',
    left: '20vw',
    top: '90px',
    marginBottom: '125px',
    padding: '1.5em 2em',
    background: 'whitesmoke',
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
    const navigate = useNavigate();
    const { user } = useContext(Data);

    const [section, setSection] = useState('');
    const [sectionList, setSectionList] = useState(["Сантехника", "Мебель", "Электричество", "Тыры", "Пыры"])

    useEffect(() => {        
        if (user.auth !== true) {
            toast.error("Вы должны быть авторизованы для просмотра страницы");
            navigate("/login");
        }
    }, [navigate])
    
    const titleRef = useRef();
    const subtitleRef = useRef();
    const descriptionRef = useRef();
    const locationRef = useRef();

    const createNewTicket = () => {
        const title = titleRef.current.value;
        const subtitle = subtitleRef.current.value;
        const description = descriptionRef.current.value;
        const location = locationRef.current.value;

        console.log(title, subtitle, description, location)

        const photoInputList = document.querySelectorAll("#photo-input");
        for (let photoInput of photoInputList) {
            console.log(photoInput.files[0])
        }

        // TODO: realise sending data to server
    }
    return (
        <>
            <Content>
                <center><Typography variant='h4'>Создание новой заявки</Typography></center><br />
                <Divider />
                <FormGroup>
                    <FormTitle text="поломка" />
                    <FormInput placeholder={'Введите название поломки'} inputRef={titleRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Подробное описание" />
                    <FormInput placeholder={'Введите подробное описание того что произошло'} multiline rows={4} inputRef={descriptionRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Местонахождение" />
                    <FormInput placeholder={'Номер кабинета или конкретное место'} inputRef={locationRef} />
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Тип поломки" />
                    <FormControl fullWidth>
                        <Select
                            defaultValue={section}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value="">
                                Выберите тип поломки
                            </MenuItem>
                            { 
                                sectionList.map((section, index) => {
                                    return <MenuItem onClick={()=>{setSection(section)}} value={index}> {section} </MenuItem>
                                })
                            } 
                            <MenuItem onClick={()=>{}}> + Добавить свой </MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormTitle text="Прикрепите фотографии" />
                    <Uploader />
                </FormGroup>
                <FormGroup>
                    <Button 
                        variant='outlined' 
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


function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="section-label">Age</InputLabel>
        <Select
          labelId="section-label"
          id="asdfsadas"
          value={age}
          label="Age"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
  );
}


function Uploader () {
    const [buttonList, setButtonList] = useState([]);
    
    const handleAddButton = () => {
        setButtonList((prevButtons) => [
            ...prevButtons, 
            <UploaderInput emitSuccess={handleAddButton} />
        ]);
    }
    
    return (
        <>
            <UploaderInput emitSuccess={handleAddButton}  />
            {buttonList}
        </>
    )
}

function UploaderInput({ emitSuccess }) {
    const [fileName, setFileName] = useState('');
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        emitSuccess();
      }
    };
  
    return (
      <Button component="label" variant="contained">
        { fileName ? `Прикреплено (${fileName})` : "Прикрепить файл" }
        <VisuallyHiddenInput type="file" onChange={handleFileChange} id='photo-input'/>
      </Button>
    );
}