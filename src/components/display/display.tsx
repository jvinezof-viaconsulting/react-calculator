import { Field, Input } from "@fluentui/react-components";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => (
  <Field className="display" size="large">
    <Input value={value || "0"} readOnly />
  </Field>
);

export default Display;
