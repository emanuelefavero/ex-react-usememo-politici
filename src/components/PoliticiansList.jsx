import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import './PoliticiansList.css';

const PoliticianCard = ({ politician }) => (
  <Card className='politicians-card'>
    <Card.Header className='header'>
      <Card.Image src={politician.image} alt={politician.name} />
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
