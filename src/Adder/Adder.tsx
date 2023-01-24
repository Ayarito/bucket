import {
  forwardRef,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import getEmojiFromText from "emoji-from-text";
import { ChangeEventHandler, useCallback, useState } from "react";

import { useSyncedStore } from "@syncedstore/react";
import * as R from "ramda";
import { store, Thingy } from "../store";

export interface Props extends InputGroupProps {
  where?: "today" | "bucket";
}

const Adder = forwardRef<Props, "div">((props, ref) => {
  const { where = "bucket" } = props;
  const tasks = useSyncedStore(store[where]);
  const [emoji, setEmoji, clearEmoji] = useInputEmoji();
  const [text, setText] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = R.pipe(
    (e) => e.currentTarget.value,
    setText
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = R.pipe(
    (e) => e.currentTarget.value,
    R.cond([
      [R.either(R.isEmpty, R.isNil), clearEmoji],
      [
        R.T,
        R.pipe(
          (text) => getEmojiFromText(text, true)?.match?.emoji.char,
          setEmoji
        ),
      ],
    ])
  );

  const onAdd = () => {
    if (!text) return;

    const task: Thingy = {
      id: crypto.randomUUID(),
      title: {
        text,
        emoji,
      },
      createdAt: new Date(),
      progress: 1,
      residence: "default",
    };

    try {
      tasks.push(task);
    } catch (e) {
      alert("dev is stupid, text him t.me/snqba");
    } finally {
      setText("");
      clearEmoji();
    }
  };

  return (
    <InputGroup variant="outline" size="md" ref={ref} {...props}>
      <InputLeftElement pointerEvents="none" children={<span>{emoji}</span>} />
      <Input
        id="adder"
        type="text"
        value={text}
        textTransform="lowercase"
        placeholder="write it down"
        variant="outline"
        onChange={handleChange}
        onKeyDown={R.when((e) => e.key === "Enter", onAdd)}
        onInput={handleInputChange}
      />
      <InputRightElement onClick={onAdd} fontSize="2xl" children="↵" />
    </InputGroup>
  );
});

const useInputEmoji = (): [string, (newEmoji: string) => void, () => void] => {
  const DEFAULT = "🏄‍♂️";
  const [emoji, setEmoji] = useState(DEFAULT);

  const clear = useCallback(() => setEmoji(DEFAULT), []);

  return [emoji, setEmoji, clear];
};

export default Adder;
