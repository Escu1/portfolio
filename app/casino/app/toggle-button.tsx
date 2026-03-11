import "./globals.css";

type ToggleButtonProps = {
  id: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled: boolean;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  id,
  enabled,
  onChange,
  disabled,
}) => {
  return (
    <span className="toggle">
      <input
        className="react-switch-checkbox"
        id={`${id}-toggler`}
        type="checkbox"
        onChange={() => onChange(!enabled)}
        checked={enabled}
        readOnly
        disabled={disabled}
      />
      <label className="react-switch-label" htmlFor={`${id}-toggler`}>
        <span
          role="button"
          tabIndex={0}
          className="react-switch-button"
          aria-label="toggle button"
          onKeyDown={(evt) => {
            if (evt.key === "Enter" && !disabled) onChange(!enabled);
          }}
        />
      </label>
    </span>
  );
};
