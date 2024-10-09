import React, { useState } from 'react';

import { Grid, GridColumn, Header, Segment } from 'semantic-ui-react';

import { BookTable } from './BookTable';
import { BookForm } from './BookForm';

export const AdminBooksView = () => {
  const [selectedId, setSelectedId] = useState();
  const [inEdit, setInEdit] = useState(false);

  return (
    <div className='page'>
      <Segment basic>
        <Grid columns={2} divided>
          <GridColumn width={10}>
            <Header as='h3'>Books</Header>
            <BookTable selectedId={selectedId} setSelectedId={setSelectedId} setInEdit={setInEdit} inEdit={inEdit}/>
          </GridColumn>
          <GridColumn width={6}>
            <Header as='h3'>{inEdit ? 'Edit' : selectedId ? 'View' : 'Create'} book</Header>
            <BookForm selectedId={selectedId} setSelectedId={setSelectedId} inEdit={inEdit} setInEdit={setInEdit}/>
          </GridColumn>
        </Grid>
      </Segment>
    </div>
  );
};