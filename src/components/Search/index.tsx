import React, { DetailedHTMLProps } from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';


const Search = () => {
    const dispatch = useDispatch()
    /* В цей стейт я отримую інформацію з value яке є в input. Він очищує тільки текст в інпуті*/
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    // Очищує інпут і робить фокус
    const onClickClear=()=>{
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus()
    }

    /* debounce викликає функцію setSearchValue через 1 секунду, а useCallback викликає цю вункцію тільки при першому рендерингу*/
    const updateSearchValue=React.useCallback(
            debounce((str: string)=>{
                /* оновлює str  */
                dispatch(setSearchValue(str))
            },250),
        [],
    )

    /* Функція відповідає за оновлення локального і глобального стейту*/
    const onChangeInput=(event: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearchValue(''))
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3198574,14.9056439 L21.7071068,20.2928932 L20.2928932,21.7071068 L14.9056439,16.3198574 C13.5509601,17.3729184 11.8487115,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,11.8487115 17.3729184,13.5509601 16.3198574,14.9056439 Z M10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 Z" fillRule="evenodd"/>
            </svg>
            <input 
                ref={inputRef}
                value={value} 
                onChange={onChangeInput} 
                className={styles.input} type="text" placeholder='Пошук піцци ...'
            />
            {value && <img onClick={onClickClear} className={styles.clearIcon} src='close.png' alt='close'></img>}
        </div>
    )
}

export default Search