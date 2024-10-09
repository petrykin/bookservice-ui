import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import {
  Button,
  Form,
  FormCheckbox,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextArea
} from 'semantic-ui-react';

const options = [
  { key: 'USD', text: 'USD', value: 'USD' },
  { key: 'EUR', text: 'EUR', value: 'EUR' },
  { key: 'UAH', text: 'UAH', value: 'UAH' }
];

const useFormInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  return {
    value,
    setValue,
    onChange: (e) => setValue(e.target.value)
  };
};

const useFormCheckbox = (initValue) => {
  const [checked, setChecked] = useState(initValue);

  return {
    checked,
    setChecked,
    onChange: (_e, data) => setChecked(data && !!data.checked)
  };
};

export const BookForm = ({ selectedId, setSelectedId, inEdit, setInEdit }) => {
  const { books, fetchBooks, addBook, updateBook } = useContext(BookContext);

  const title = useFormInput('');
  const isbn = useFormInput('');
  const description = useFormInput('');
  const price = useFormInput('0');
  const currency = useFormInput('USD');
  const coverUrl = useFormInput('https://cutt.ly/HjoZZNp');
  const quantity = useFormInput('0');
  const author = useFormInput('');
  const visible = useFormCheckbox(false);

  useEffect(() => {
    const selectedBook = books.find(book => selectedId === book.id);
    title.setValue(selectedBook && selectedBook.title || '');
    isbn.setValue(selectedBook && selectedBook.isbn || '');
    description.setValue(selectedBook && selectedBook.description || '');
    price.setValue(selectedBook && selectedBook.price.toString() || '0');
    currency.setValue(selectedBook && selectedBook.currency || 'USD');
    coverUrl.setValue(selectedBook && selectedBook.coverUrl || '');
    quantity.setValue(selectedBook && selectedBook.quantity.toString() || '0');
    author.setValue(selectedBook && selectedBook.author || '');
    visible.setChecked(selectedBook && selectedBook.visible || false);
  }, [selectedId]);

  const updatedBook = (id) => ({
      id: id,
      title: title.value,
      isbn: isbn.value,
      description: description.value,
      price: parseInt(price.value, 10),
      currency: currency.value,
      coverUrl: coverUrl.value,
      quantity: parseInt(quantity.value, 10),
      author: author.value,
      visible: visible.checked
  });

  const onSubmit = async () => {
    selectedId ? updateBook(selectedId, updatedBook(selectedId)) : addBook(updatedBook(undefined));
    setSelectedId(null);
    setInEdit(false);
  };

  return (
    <section>
      <Form>
        <FormInput
          label='Title'
          required
          readOnly={!inEdit && !!selectedId}
          value={title.value}
          onChange={title.onChange}
        />
        <FormInput
          label='Isbn'
          required
          readOnly={!inEdit && !!selectedId}
          value={isbn.value}
          onChange={isbn.onChange}
        />
        <FormInput
          label='Author'
          required
          readOnly={!inEdit && !!selectedId}
          value={author.value}
          onChange={author.onChange}
        />
        <FormTextArea
          label='Description'
          rows={3}
          readOnly={!inEdit && !!selectedId}
          value={description.value}
          onChange={description.onChange}
        />
        <FormGroup widths='equal'>
          <FormInput
            label='Price'
            placeholder={0}
            required
            readOnly={!inEdit && !!selectedId}
            value={price.value}
            onChange={price.onChange}
          />
          <FormSelect
            fluid
            label='Currency'
            options={ options }
            required
            readOnly={!inEdit && !!selectedId}
            value={currency.value}
            onChange={currency.onChange}
          />
        </FormGroup>
        <FormInput
          label='Cover URL'
          readOnly={!inEdit && !!selectedId}
          value={coverUrl.value}
          onChange={coverUrl.onChange}
        />
        <FormInput
          label='Quantity'
          placeholder={0}
          required
          readOnly={!inEdit && !!selectedId}
          value={quantity.value}
          onChange={quantity.onChange}
        />
        <FormCheckbox
          label='Visible'
          checked={visible.checked}
          onChange={visible.onChange}
          readOnly={!inEdit && !!selectedId}
        />
        <Button type='submit' primary disabled={!inEdit && !!selectedId} onClick={ onSubmit }>Submit</Button>
      </Form>
    </section>
  );
};