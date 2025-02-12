<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Room;

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
        $data = json_decode($request->getContent(), true);

        $text = $data['text'];
        $price = $data['price'];

        $room = new Room();

        if ($text) {
            $room->setText($text);
        }
        if ($price) {
            $room->setPrice($price);
        }

        $em->persist($room);
        $em->flush();

        return new JsonResponse(['status' => 'Room added!']);
    }

}
