import { memo } from 'react';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import './PoliticiansList.css';

const FALLBACK_IMAGE = '/image-placeholder.svg';

const PoliticianCard = memo(({ name, image, position, biography }) => {
  console.log('Rendering card:', name);

  return (
    <Card className='politicians-card'>
      <Card.Header className='header'>
        <Card.Image
          src={image || FALLBACK_IMAGE}
          alt={name}
          onError={({ currentTarget: image }) => {
            if (image.getAttribute('src') !== FALLBACK_IMAGE) {
              image.src = FALLBACK_IMAGE;
            }
          }}
        />
        <Card.Title>{name}</Card.Title>
      </Card.Header>
      <Card.Content className='content'>
        <p>
          <Badge>{position}</Badge>
        </p>
        <p>{biography}</p>
      </Card.Content>
    </Card>
  );
});

export const PoliticiansList = ({ politicians }) =>
  politicians.length > 0 && (
    <ul className='politicians-list'>
      {politicians.map(politician => (
        <li key={politician.id}>
          <PoliticianCard {...politician} />
        </li>
      ))}
    </ul>
  );
