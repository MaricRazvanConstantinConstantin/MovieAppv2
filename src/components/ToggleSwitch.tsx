import type {JSX} from 'react';

export default function ToggleSwitch({
  isActive,
  handleToggle,
  icon,
}: {
  isActive: boolean;
  handleToggle: () => void;
  icon: JSX.Element;
}) {
  return (
    <div
      className={`toggle-switch ${isActive ? 'on' : 'off'}`}
      onClick={handleToggle}
      role='button'
      aria-pressed={isActive}
    >
      <div className='knob flex items-center pl-0.25'>{icon}</div>
    </div>
  );
}
