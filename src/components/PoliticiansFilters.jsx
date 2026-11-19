import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import './PoliticiansFilters.css';

export const PoliticiansFilters = ({ filter, positions, onFilterChange }) => {
  return (
    <form className='filter-form' onSubmit={e => e.preventDefault()}>
      <Input
        placeholder='Search politician'
        value={filter.search}
        onChange={e => onFilterChange({ ...filter, search: e.target.value })}
        aria-label='Search politician'
      />

      <Select
        value={filter.position}
        onChange={e => onFilterChange({ ...filter, position: e.target.value })}
        aria-label='Filter by position'
      >
        <option value=''>All positions</option>
        {positions.map(position => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </Select>
    </form>
  );
};
