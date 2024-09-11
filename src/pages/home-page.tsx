import { Center, Heading, Image, Text, VStack } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Center width={"100%"} height={"100%"}>
      <VStack margin={40} alignItems={"flex-start"} width={"100%"} gap={10}>
        {/* Animate the heading */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading>Welcome To</Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image src={logo} width={"50%"} />
          </motion.div>
        </div>

        <Text width={"100%"} textAlign={"right"}>
          Welcome to our project management platform, where organization meets
          efficiency, and collaboration flourishes. Say goodbye to scattered
          tasks and endless email threads – our intuitive interface empowers you
          to streamline your projects effortlessly.
        </Text>
        <Text width={"100%"} textAlign={"left"}>
          With our platform, you can easily break down your projects into
          manageable jobs, ensuring clarity and accountability every step of the
          way. Whether you're a solo entrepreneur or leading a team, our system
          adapts to your needs, offering a structured approach to project
          management that enhances productivity and drives results.
        </Text>
        <Text width={"100%"} textAlign={"right"}>
          But we don't stop there – we understand the importance of seamless
          communication in successful project execution. That's why we've
          integrated a chat mechanism for each job, allowing team members to
          discuss tasks, share files, and brainstorm ideas in real-time. No more
          toggling between multiple applications or drowning in endless
          notifications – everything you need is right at your fingertips.
        </Text>
      </VStack>
    </Center>
  );
}
