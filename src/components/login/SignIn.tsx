import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useState, useRef } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Flex } from "../primitives/Flex";
import { useAuth } from "../../contexts/auth";
import { theme } from "../../theme";
import { ChangeLoginMode } from "./ChangeLoginMode";

type SignInProps = { changeMode: () => void };
export const SignIn = ({ changeMode }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { authenticate } = useAuth();
  const toast = useToast();
  const toastIdRef = useRef();

  function closeToast() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  const handleAuthenticate = async () => {
    setError("");
    const messageError = error;
    if (!email || !password) {
      setError("Empty Email/Password");
      return;
    }
    try {
      setLoading(true);
      await authenticate({ email, password });
    } catch (error) {
      setError(
        (error as AxiosError<{ message: string }>)?.response?.data?.message!
      );
      toast({
        position: "top-right",
        duration: 3000,
        render: () => (
          <Box color="white" p={3} bg="red.500">
            {messageError}
          </Box>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={8}>
        <Heading mb={2}>Sign In</Heading>
        <Text>Welcome Back!</Text>
      </Box>

      <Flex style={{ gap: 8 }} mb={2}>
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <AiOutlineMail />
          </InputLeftElement>
          <Input
            required
            type="email"
            placeholder="Enter Your Email"
            fontSize="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <AiFillLock />
          </InputLeftElement>
          <Input
            required
            type="password"
            placeholder="Enter Your Password"
            fontSize="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <Button
          size="lg"
          color={theme.colors.primary}
          width="full"
          onClick={handleAuthenticate}
          type="submit"
        >
          {isLoading ? <CircularProgress /> : "Sign In"}
        </Button>
      </Flex>

      <ChangeLoginMode mode={"signin"} onClick={changeMode} />
    </Box>
  );
};
