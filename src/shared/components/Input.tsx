import { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  label?: string,
  mode?: 'flat' | 'outlined';
  needHide?: boolean;
};

const Input = ({
  label = '',
  mode = 'outlined',
  placeholder = '',
  value,
  onChangeText,
  needHide = false,
}: Props) => {
  const [pwHide, setPwHide] = useState(needHide);
    
  const handlePwShow = () => needHide && setPwHide(!pwHide);
  return (
      <TextInput
          label={label}
          mode={mode}
          placeholder={placeholder}
          secureTextEntry={pwHide}
          value={value}
          onChangeText={onChangeText}
          accessibilityLabelledBy={undefined}
          accessibilityLanguage={undefined}
          style={styles.input}
          // right={needHide ? <TextInput.Icon icon={pwHide ? "eye-outline" : "eye-off-outline"} onPress={handlePwShow}/> : <></>}
      />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
  }
})

export default Input;
