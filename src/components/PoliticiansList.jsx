import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import './PoliticiansList.css';

const FALLBACK_IMAGE = '/image-placeholder.svg';

const PoliticianCard = ({ politician }) => (
  <Card className='politicians-card'>
    <Card.Header className='header'>
      <Card.Image
        src={politician.image || FALLBACK_IMAGE}
        alt={politician.name}
        onError={({ currentTarget: image }) => (image.src = FALLBACK_IMAGE)}
      />
      <Card.Title>{politician.name}</Card.Title>
    </Card.Header>
    <Card.Content className='content'>
      <p>
        <Badge>{politician.position}</Badge>
      </p>
      <p>{politician.biography}</p>
    </Card.Content>
  </Card>
);

export const PoliticiansList = ({ politicians }) =>
  politicians.length > 0 && (
    <ul className='politicians-list'>
      {politicians.map(politician => (
        <li key={politician.id}>
          <PoliticianCard politician={politician} />
        </li>
      ))}
    </ul>
  );
