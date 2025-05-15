import { Link } from 'react-router-dom';
import { menuTree } from '../data/menuTree';

function renderMenu(items) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.link}>
          <Link to={item.link}>{item.title}</Link>
          {item.children && renderMenu(item.children)}
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar">
      {renderMenu(menuTree)}
    </div>
  );
}
