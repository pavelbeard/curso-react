import { Badge, Button, TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

enum ResultType {
  OK,
  FAILED,
} 

export default function CreateNewUser() {
  const { addUser } = useUserActions();
  const [result, setResult] = useState<ResultType.OK | ResultType.FAILED | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const github = formData.get('github') as string;

    if (!username || !github) {
      return setResult(ResultType.FAILED);  
    }

    addUser({ username, github });
    setResult(ResultType.OK);
    form.reset();
  }

  useEffect(() => {
    const clearBadgeTimeout = setTimeout(() => setResult(null), 2000);

    return () => {
      clearTimeout(clearBadgeTimeout);
    }
  }, [result, addUser]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <TextInput
            placeholder="Pon tu username..." 
            name="username"
        />
        <TextInput
            placeholder="Pon tu github..."
            name="github" 
        />
        <Button type="submit">Crear un nuevo usuario.</Button>
        {result == ResultType.OK && <Badge color="green">Se ha guardado correctamente</Badge>}
        {result == ResultType.FAILED && <Badge color="red">Algo se ha pasado mal...</Badge>}
    </form>
  )
}
