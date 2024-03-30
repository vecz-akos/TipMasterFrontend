import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = {
  label?: string,
  mode?: 'flat' | 'outlined';
  placeholder?: string;
  secure?: boolean;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
};

const Input = ({
  label = '',
  mode = 'outlined',
  placeholder = '',
  secure = false,
  value,
  onChangeText,
}: Props) => {
    return (
        <TextInput
            label={label}
            mode={mode}
            placeholder={placeholder}
            secureTextEntry={secure}
            value={value}
            onChangeText={onChangeText}
            accessibilityLabelledBy={undefined}
            accessibilityLanguage={undefined}
            style={styles.input}
        />
    );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
  }
})

export default Input;
