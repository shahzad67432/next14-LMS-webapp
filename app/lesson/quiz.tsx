"use client"
import { challengeOptions, challenges, userProgress, userSubscription } from '@/db/schema'
import React, { useState, useTransition } from 'react'
import Header from './header';
import QuestionBubble from './QuestionBubble';
import Challenge from './challenge';
import Footer from './Footer';
import { upperstChallengeProgress } from '@/actions/challenge-progress';
import { toast } from 'sonner';
import { reduceHearts } from '@/actions/user-progress';
import Confetti from 'react-confetti'
import { useAudio, useWindowSize, useMount } from 'react-use';
import Image from 'next/image';
import ResultCard from './result-card';
import { useRouter } from 'next/navigation';
import { useHeartsModel } from '@/store/use-hearts-model';
import { usePracticeModal } from '@/store/use-practice-modal';

type props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
      completed: boolean;
      challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscribtion: typeof userSubscription.$inferInsert & {
      isActive: boolean
    } | null | undefined;
}

const Quiz = ({initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscribtion}: props) => {
  const {open: openHeartsModal} = useHeartsModel();
  const {open: openPracticeModal} = usePracticeModal();

  useMount(()=>{
    if(initialPercentage === 100){
      openPracticeModal();
    }
  })

  const {width, height} = useWindowSize();
  const router = useRouter()
  const [finishAuido] = useAudio({ src: "/finish.wav", autoPlay: true });
  const [
    correctAudio,
    _c,
    correctControls,
  ] = useAudio({src:" /correct.wav "})
  const [
    inCorrectAudio,
    _i,
    inCorrectControls,
  ] = useAudio({src:" /incorrect.wav "})


  const [pending, startTransition] = useTransition()
  const [lessonId] = useState(initialLessonId)
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(()=>{
    return initialPercentage === 100 ? 0 : initialPercentage;
  })
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(()=>{
    const unCompletedIndex = challenges.findIndex((challenge)=>{!challenge.completed})
    return unCompletedIndex === -1 ? 0 : unCompletedIndex;
  })
  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  const onNext = ()=>{
    setActiveIndex((current)=> current + 1)
  }

  const onSelect = (id:number) => {
    if(status!== "none")return;
    setSelectedOption(id)
  }

  const onContinue = ()=>{
    if(!selectedOption){
      return;
    }

    if(status === "correct" || status === "wrong"){
      {status === "correct" ? onNext(): null};
      setStatus("none");
      setSelectedOption(undefined)
      return;
    }
    const correctOption = options.find((option)=> option.correct)
    if(!correctOption){
      return;
    };
    if(correctOption.id === selectedOption){
      startTransition(()=>{
        upperstChallengeProgress(challenge.id)
          .then((response)=>{
            if(response?.error === "hearts"){
              openHeartsModal();
              return;
            }
            correctControls.play();
            setStatus("correct")
            setPercentage((prev)=> prev + 100 / challenges.length)

            if(initialPercentage === 100){
              setHearts((prev)=> Math.min(prev + 1, 5))
            }
          })
          .catch((error) => {
            console.error("Server error:", error);
            toast.error("Something went wrong. Please try again later.");
          });
      })
    }else{
      startTransition(()=>{
        reduceHearts(challenge.id)
          .then((response: any)=>{
            if(response?.error === "hearts"){
              openHeartsModal();
              return;
            }
            inCorrectControls.play();
            setStatus("wrong");
            if(!response?.error){
              setHearts((prev)=> Math.max(prev - 1, 0))
            }
          })
          .catch((error) => {
            console.error("Server error:", error);
            toast.error("Something went wrong. Please try again later.");
          });
      });
    }
  };

  if(!challenge){
    return(
      <>
        {finishAuido}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}

        />
        <div className='flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto h-full text-center items-center justify-center'>
          <Image
            src={'/finish.svg'}
            height={100}
            width={100}
            alt='finish'
            className='hidden lg:block'
          />
          <Image
            src={'/finish.svg'}
            height={50}
            width={50}
            alt='finish'
            className='lg:hidden block'
          />

          <h1 className='text-xl lg:text-3xl text-neutral-700'>
            Great job <br/> You&apos;ve completed the lesson
          </h1>
          <div  className='flex items-center gap-y-4 w-full'>
            <ResultCard
              variant={"points"}
              value={challenges.length * 10}
            />
            <ResultCard
              variant={"hearts"}
              value={hearts}
            />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status='completed'
          onCheck={()=>router.push('/learn')}
        />
      </>
    )
  };

  const title = challenge.type === "ASSIST" ? "Select the Correct meaning" : challenge.question; ;

  return (
    <div>
      {correctAudio}
      {inCorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscribtion?.isActive}
      />
      <div className='flex-1'>
        <div className='lg:h-[73vh] h-[80vh] flex items-center justify-center'>
          <div className='lg:min-h-[350px] lg:w-[800px] w-full px-6 lg:px-0 flex flex-col gap-y-12 '>
            <h1 className='text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700'>
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question}/>
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption || undefined}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </div>
  )
}

export default Quiz