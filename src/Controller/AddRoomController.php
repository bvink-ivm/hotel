<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Room;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

final class AddRoomController extends AbstractController
{
    #[Route('/admin/room', name: 'add_room_view')]
    public function index(EntityManagerInterface $em): Response
    {
        $rooms = $em->getRepository(Room::class)->findAll();

        return $this->render('add_room/index.html.twig', [
            'rooms' => $rooms
        ]);
    }

    #[Route('/admin/room/add', name: 'add_room')]
    public function addRoom(EntityManagerInterface $em, Request $request): JsonResponse
    {
        $type = $request->request->get('type');
        $text = $request->request->get('text');
        $price = $request->request->get('price');
        $photo = $request->files->get('photo');

        $room = new Room();

        if ($type) {
            $room->setType($type);
        }
        if ($text) {
            $room->setText($text);
        }
        if ($price) {
            $room->setPrice($price);
        }
        if ($photo instanceof UploadedFile) {
            $newFilename = uniqid().'.'.$photo->guessExtension();
            try {
                $photo->move(
                    $this->getParameter('photos_directory'),
                    $newFilename
                );
                $room->setPhoto($newFilename);
            } catch (FileException $e) {
                return new JsonResponse(['status' => 'Photo upload failed!'], 500);
            }
        }

        $em->persist($room);
        $em->flush();

        return new JsonResponse(['status' => 'Room added!']);
    }
}
